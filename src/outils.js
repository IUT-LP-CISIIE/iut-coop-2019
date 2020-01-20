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
		}		
	}
}