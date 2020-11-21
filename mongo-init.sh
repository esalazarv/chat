#!/bin/bash
set -e;

if [ -n "${MONGO_INITDB_USERNAME:-}" ] && [ -n "${MONGO_INITDB_PASSWORD:-}" ]
then
	"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
		db.createUser({
			user: $(_js_escape "$MONGO_INITDB_USERNAME"),
			pwd: $(_js_escape "$MONGO_INITDB_PASSWORD"),
			roles: [ { role: $(_js_escape "$MONGO_INITDB_ROLE"), db: $(_js_escape "$MONGO_INITDB_DATABASE") } ]
			})
	EOJS
	echo "User $MONGO_INITDB_USERNAME and database $MONGO_INITDB_DATABASE was created successfully"
else
  echo "Can not create non root user: $MONGO_INITDB_USERNAME for $MONGO_INITDB_DATABASE database"
fi