
	    // Add a linkout or hamburger plugin.
	    LNK.addLinkoutPlugin = function addLinkoutPlugin (kind, spec) {
	       if ((kind === 'linkout-plugin' || kind === 'hamburger-plugin') && spec.src) {
		   // Create an instance of the plugin.
		   const iframe = LNK.createPluginInstance (kind, spec);
		   iframe.classList.add('hide');
		   document.body.append(iframe);

		   // For each linkout, create a function that sends a Vanodi message to the instance.
		   if (kind === 'linkout-plugin') {
		       for (let idx = 0; idx < spec.linkouts.length; idx++) {
			   spec.linkouts[idx].linkoutFn = ((spec, nonce) => function(labels) {
			       LNK.sendMessageToPlugin ({ nonce, op: 'linkout', id: spec.messageId, labels });
			   })(spec.linkouts[idx], iframe.dataset.nonce);
		       }
		       for (let idx = 0; idx < spec.matrixLinkouts.length; idx++) {
			   spec.matrixLinkouts[idx].linkoutFn = ((spec, nonce) => function(labels) {
			       LNK.sendMessageToPlugin({ nonce, op: 'matrixLinkout', id: spec.messageId, labels });
			   })(spec.matrixLinkouts[idx], iframe.dataset.nonce);
		       }
		       linkouts.addPlugin(spec);
		   } else {
		       spec.action = ((spec, nonce) => function() {
			   LNK.sendMessageToPlugin({ nonce, op: 'hamburgerLinkout', id: spec.messageId });
		       })(spec, iframe.dataset.nonce);
		       linkouts.addHamburgerLinkout(spec);
		   }

		   // Regenerate the linkout menus.
		   CUST.definePluginLinkouts();
	       }
	    };
