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
    stage ('OpenAPI Lint') {
        echo "Linting openapi.yaml"
        sh "python3 openapi-linter.py openapi.yaml"
    }

    stage('Checkout') {
        deleteDir()
        checkout scm
        sh "git fetch"
    }

    stage('Package Docs') {
        steps {
            sh """
            ./build-docs.sh
            """
            dir('linode-api-docs') {
                archive '*.deb,*.changes'
            }
        }
    }

    stage('Apt-Repo') {
        when {
            expression {
                repos = [master: 'linode-internal-apt-jessie-stg', develop: 'linode-internal-apt-jessie-dev', release: 'linode-internal-apt-jessie-testing']
                return repos.find{ it.key == env.BRANCH_NAME }?.value
            }
        }

        steps {
            milestone 200 // This Milestone prevent uploading debs from older concurrent builds
            sshagent (credentials: ['deploy-prod']) {
                sh "LOGNAME=jenkins dupload --to ${repos[env.BRANCH_NAME]} -c linode-api-docs"
            }
        }
    }
}
