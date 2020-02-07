export const outils = {
	methods : {
		getGravatar(membre) {
			let hash = md5(membre.email);
			return 'https://avatars.dicebear.com/v2/bottts/'+hash+'.svg';
		},
		getMembre(id) {
			let membres = this.$store.state.membres;
			for(let i=0;i<membres.length;i++){
				if(membres[i].id == id) {
					return membres[i];
				}
			}
		},
		selectText(node) {

		    if (document.body.createTextRange) {
		        const range = document.body.createTextRange();
		        range.moveToElementText(node);
		        range.select();
		    } else if (window.getSelection) {
		        const selection = window.getSelection();
		        const range = document.createRange();
		        range.selectNodeContents(node);
		        selection.removeAllRanges();
		        selection.addRange(range);
		    } else {
		        console.warn("Could not select text in node: Unsupported browser.");
		    }
		}			
	}
}