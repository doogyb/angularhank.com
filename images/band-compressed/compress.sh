#! /bin/bash

for f in `ls | grep .jpg`; do
	jpegoptim --size=250k $f --overwrite;
done
