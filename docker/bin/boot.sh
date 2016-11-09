#!/bin/sh

require_env_var() {
  if [ "$1" == "" ]; then
    echo "Error: '$2' was not set."
    echo "Aborting."
    exit 1
  else
    echo "   $2: $1"
  fi
}

echo "Convergence Code Editor.  Checking required environment variables."

require_env_var $convergence_realtime_url "convergence_realtime_url"
require_env_var $anonymous_auth "anonymous_auth"

echo "All required variables are set.  Booting."
echo ""

exec supervisord --configuration /etc/supervisord.conf