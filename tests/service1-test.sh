#!/bin/bash
die () {
    echo Script aborted prematurely
    echo >&2 "$@"
    kill -INT $$
}

[ "$#" -eq 1 ] || die "1 argument required, $# provided"
echo $1 | grep -E -q '^[0-9]+$' || die "Numeric argument required, $1 provided"

NUMBER_OF_TESTS=$1
if [ $NUMBER_OF_TESTS -gt 1000 ]; then
    echo Setting number of tests to 20
    let $NUMBER_OF_TESTS=20
fi

COUNTER=0
while [  $COUNTER -lt $NUMBER_OF_TESTS ]; do
    # echo test $COUNTER: 
    # curl -Ls http://localhost:62605 && echo "done $COUNTER" &
    curl -Ls https://default-service1-4bbadaf.z0.azproj.io/ && echo "done $COUNTER" &
    let COUNTER=COUNTER+1 
done