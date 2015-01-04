COFFEEC = coffee
 
 
# Build app package
APPSRC = src/HandlebarsLoader.coffee
APPOBJ = ${APPSRC:.coffee=.js}
APPOUT = HandlebarsLoader.js
 
$(APPOUT): $(APPOBJ)
	cat $^ > $@
 
%.js: %.coffee
	$(COFFEEC) -bc --no-header $<