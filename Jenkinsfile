// vim: ft=groovy ts=2 sw=4 et
def docs_version = 'UNKNOWN'
def post_tag_commits = ''
def repos = [master: 'linode-internal-apt-jessie-stg', develop: 'linode-internal-apt-jessie-dev', release: 'linode-internal-apt-jessie-testing']

environment {
    GA_ID = '{DEBCONF_CLOUD_GA_ID}'
    APP_ROOT = '{DEBCONF_APP_ROOT}'
    API_ROOT = '{DEBCONF_API_ROOT}'
    LOGIN_ROOT = '{DEBCONF_LOGIN_ROOT}'
    API_VERSION = 'v4' // used by docs - TODO can remove?
    BUILD_ENV = "${(env.BRANCH_NAME != 'master') ? env.BRANCH_NAME : '' }"
    // POST_TAG_COMMITS = "$post_tag_commits" - TODO can remove?
}

node {
    def image;

    stage('Checkout') {
        deleteDir()
        checkout scm
        sh "git fetch"

        dir('ReDoc-customized') {
            checkout poll: false, scm: [
                $class: 'GitSCM',
                branches: [[name: 'development']],
                doGenerateSubmoduleConfigurations: false,
                credentialsId: "baker",
                extensions: [[
                    $class: 'WipeWorkspace',
                ], [
                    $class: 'RelativeTargetDirectory',
                    relativeTargetDir: 'ReDoc-customized',
                ], [
                    $class: 'CloneOption',
                    noTags: false,
                ]],
                userRemoteConfigs: [[
                    refspec: "+refs/heads/*:refs/remotes/origin/*",
                    url: 'git@bits.linode.com:LinodeAPI/ReDoc-customized',
                ]]
            ]
        }
    }

    stage('Build Docker') {
        BUILD_NAME = URLDecoder.decode(env.BUILD_TAG, "UTF-8").replaceAll("[^a-zA-Z0-9_.-]", "_")
        image = docker.build(BUILD_NAME.toLowerCase(), '.')
        image.inside() { c ->
            sh "cd ReDoc-customized/ReDoc-customized && yarn install && yarn bundle && yarn compile:cli"
        }
    }

    stage ('Apply Substitutions') {
        version = sh(script: "git describe --tags --abbrev=0", returnStdout: true).trim()
        sh "sed -i -- 's|version: DEVELOPMENT|version: ${version}|' openapi.yaml"

        replace_to = ''
        page_url = ''
        if (env.BRANCH_NAME == 'development') {
            replace_to = 'https://api.dev.linode.com/v4'
            page_url = 'https://developers.dev.linode.com'
        } else if (env.BRANCH_NAME ==~ /^release\/\d+\.\d+$/) {
            replace_to = 'https://api.testing.linode.com/v4'
            page_url = 'https://developers.testing.linode.com'
        } else {
            echo "Skipping environment-specific changes"
        }

        if (replace_to != '') {
            echo "Applying environment-specific changes"
            image.inside() { c ->
                sh "sed -i -- 's|https://api.linode.com/v4|${replace_to}|' openapi.yaml"
                sh "sed -i -- 's|https://developers.linode.com|${page_url}|' openapi.yaml"
            }
        }
    }

    stage ('OpenAPI Lint') {
        echo "Linting openapi.yaml"
        image.inside() { c ->
            sh "python3 openapi-linter.py openapi.yaml"
        }
    }

    stage('Package Docs') {
        image.inside() { c ->
            sh "./build-docs.sh"
            archive '*.deb,*.changes'
        }
    }

    if (env.BRANCH_NAME == 'master') {
        stage ('Apt-Repo') {
            sh "dupload --to linode-internal-apt-jessie-stg --nomail *.changes"
        }
    } else if (env.BRANCH_NAME == 'development') {
        stage('Apt-Repo') {
            sh "dupload --to linode-internal-apt-jessie-dev --nomail *.changes"
        }
    } else if (env.BRANCH_NAME ==~ /^release\/\d+\.\d+\.\d+$/) {
        stage('Apt-Repo') {
            sh "dupload --to linode-internal-apt-jessie-testing --nomail *.changes"
        }
    } else {
        echo "Branch '${env.BRANCH_NAME}' is not 'master', 'development', or a release branch.  Skipping package upload."
    }
}
