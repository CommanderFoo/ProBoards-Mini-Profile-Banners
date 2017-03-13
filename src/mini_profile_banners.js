class Mini_Profile_Banners {

	static init(){
		this.PLUGIN_ID = "pd_mini_profile_banners";

		this.banners = [];

		this.setup();

		$(this.ready.bind(this));
	}

	static ready(){
		let location_check = (

			pb.data("route").name == "search_results" ||
			pb.data("route").name == "conversation" ||
			pb.data("route").name == "list_messages" ||
			pb.data("route").name == "thread" ||
			pb.data("route").name == "list_posts" ||
			pb.data("route").name == "permalink" ||
			pb.data("route").name == "all_recent_posts" ||
			pb.data("route").name == "recent_posts" ||
			pb.data("route").name == "posts_by_ip"

		);

		if(location_check){
			Mini_Profile_Banners_Mini_Profile.init();
		}
	}

	static setup(){
		let plugin = pb.plugin.get(this.PLUGIN_ID);

		if(plugin && plugin.settings){
			this.banners = plugin.settings.banners;
		}
	}

}