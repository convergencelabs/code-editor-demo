node {
    deleteDir()
    withCredentials([[$class: 'StringBinding', credentialsId: 'NpmAuthToken', variable: 'NPM_TOKEN'],
    [$class: 'StringBinding', credentialsId: 'ConvNpmAuthToken', variable: 'C_NPM_TOKEN'],
    [$class: 'UsernamePasswordMultiBinding', credentialsId: 'NexusRepo', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASSWORD']]) {
  
    gitlabCommitStatus {
      stage 'Checkout'
      checkout scm

      stage 'Setup Registry'
      sh '''
        npm config set registry https://nexus.convergencelabs.tech/repository/npm/
        npm config set //nexus.convergencelabs.tech/repository/npm/:_authToken=$NPM_TOKEN
        npm config set //nexus.convergencelabs.tech/repository/convergence-npm/:_authToken=$C_NPM_TOKEN
      '''

      stage 'NPM Install'
      sh '''
          npm install
      '''

      stage 'NPM Build'
      sh '''
          npm run docker-copy
      '''

      stage 'Docker Build'
      sh '''
        docker login -u $NEXUS_USER -p $NEXUS_PASSWORD nexus.convergencelabs.tech:18443
        docker build -t nexus.convergencelabs.tech:18444/convergence-code-editor docker-build
      '''

      stage 'Docker Publish'
      sh '''
        docker login -u $NEXUS_USER -p $NEXUS_PASSWORD nexus.convergencelabs.tech:18444
        docker push nexus.convergencelabs.tech:18444/convergence-code-editor
      '''
    }
   }
   deleteDir()
 }