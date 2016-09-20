
all:

run:
	nodejs organs-manager.js &

stop:
	kill -9 $$( pgrep -f "nodejs organs-manager.js" )

.PHONY: all run stop clean


