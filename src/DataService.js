import Axios from 'axios';

export const BACKEND_URL = 'http://localhost:3000';
//Előző tanfolyam adatforrása
// export const FIREBASE_URL = 'https://fizuhu-56a0c.firebaseio.com/';
export const FIREBASE_URL = 'https://fizuhulive-ba27c.firebaseio.com/';


//Ezeket a függvényeket lehet kívülről importálni a fájlból
export default {
	GetPost(postID) {
		return Axios
			.get(`${FIREBASE_URL}/blogposts/${postID}.json`)
			.then((result) => {
				return result.data;
			});
	},
	//contact
	PostContactMessage(data) {
		return Axios.post(FIREBASE_URL + '/contactMessages.json', data)
			.then(() => {
				return true;
			})
			.catch(error => {
				console.warn(error);
				return false;
			});
	},
	//survey
	GetSurveyResponses() {
		return Axios
			.get(FIREBASE_URL + '/surveyResponses.json')
			.then((result) => {
				return result.data;
			});
	},
	PostSurveyResponse(data) {
		return Axios.post(FIREBASE_URL + '/surveyResponses.json', data)
			.then(() => {
				return true;
			})
			.catch(error => {
				console.warn(error);
				return false;
			});
	}
}