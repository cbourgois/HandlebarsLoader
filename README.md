HandlebarLoader                
=============

This script help to load [Handlebar](https://github.com/wycats/handlebars.js) templates and partials easily.

How to use   
-------

### Initialisation ###

    var loader = new HandlebarLoader();
    loader.load( 
    	[ 
    		'template1', 
    		'template2',
    		'template3'
    	], 
    	[         
    		'partial1'
    	],  
    	function()
    	{   
    		// templates are available...
    	} 
    );
                    

### To use a template ###
            
    loader.getTemplate( 'template1' )();

### To use easily all templates ###

    var templateContainer = loader.getAllTemplates();
    templateContainer.template1();
    templateContainer.template2( { foo: 'bar' } );
       

Options
-------
By default, the loader will load ``template1`` in ``tpl/template1.html`` and ``partial1`` in ``tpl/partials/partial1.html``.
<table >
  <thead>
    <tr>
      <th>Name</th>
      <th>Definition</th>
      <th>Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>baseUrl</td>
      <td>Define templates folder</td>
      <td><code>tpl/</code></td>
    </tr>
    <tr>
      <td>partialUrl</td>
      <td>Define partials folder</td>
      <td><code>tpl/partials/</code></td>
    </tr>
    <tr>
      <td>extension</td>
      <td>Define template & partial extension</td>
      <td><code>html</code></td>
    </tr>
  </tbody>
</table>


Define options at initialisation:

    var loader = new HandlebarLoader( {
        baseUrl: 'templates/',
        partialUrl: 'partials/',
        extension: 'hb'
    } );

Now, this loader will load ``template1`` in ``templates/template1.hb`` and ``partial1`` in ``partials/partial1.hb``.