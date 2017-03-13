class Mini_Profile_Banners_Mini_Profile {

	static init(){
		this.add_banners_to_mini_profile();

		pb.events.on("afterSearch", this.add_banners_to_mini_profile.bind(this));
	}

	static add_banners_to_mini_profile(){
		let $mini_profiles = $(".item .mini-profile");

		if(!$mini_profiles.length){
			return;
		}

		$mini_profiles.each((index, item) => {
			let $mini_profile = $(item);
			let $elem = $mini_profile.find(".mini-profile-banners");
			let $user_link = $mini_profile.find("a.user-link[href*='user/']");
			let $info = $mini_profile.find(".info");

			if(!$elem.length && !$info.length){
				return;
			}

			if($user_link.length){
				let user_id_match = $user_link.attr("href").match(/\/user\/(\d+)\/?/i);

				if(!user_id_match || !parseInt(user_id_match[1], 10)){
					return;
				}

				let user_id = parseInt(user_id_match[1], 10);
				let user_banners = this.get_user_banners(user_id);

				if(!user_banners.length){
					return;
				}

				let using_info = false;

				if(!$elem.length){
					using_info = true;
					$elem = $("<div class='mini-profile-banners'></div>");
				}

				let html = "";

				for(let i = 0; i < user_banners.length; ++ i){
					html += "<img src='" + user_banners[i] + "' /><br />";
				}

				$elem.html(html);

				if(using_info){
					$info.append($elem);
				}

				$elem.show();
			}

		});
	}

	static get_user_banners(user_id = 0){
		if(!user_id){
			return [];
		}

		let banners = Mini_Profile_Banners.banners;
		let user_banners = [];

		for(let b = 0, l = banners.length; b < l; ++ b){
			if($.inArrayLoose(user_id, banners[b].members) > -1){
				user_banners.push(banners[b].image_url);
			}
		}

		return user_banners;
	}

};