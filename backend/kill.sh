#!/bin/bash

# Encuentra y mata el proceso en el puerto 3000
PID=$(lsof -ti :3000)

if [ -z "$PID" ]; then
  echo "No hay procesos ejecutándose en el puerto 3000"
else
  echo "Matando proceso $PID"
  kill -9 $PID
fi
