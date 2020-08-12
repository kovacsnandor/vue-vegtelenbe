import Axios from 'axios';

export const BACKEND_URL = 'http://localhost:3000';
//Előző tanfolyam adatforrása
// export const FIREBASE_URL = 'https://fizuhu-56a0c.firebaseio.com/';
export const FIREBASE_URL = 'https://fizuhulive-ba27c.firebaseio.com/';

const apiKey = "AIzaSyAnXuYXsIii0iObuoiLi9ni8iCk95WuWx0";
const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`

import store from './store';

//Ezeket a függvényeket lehet kívülről importálni a fájlból
export default {
	Auth({
		email,
		password,
		isSignUp
	}) {
		return Axios.post(
				isSignUp ? signUpUrl : signInUrl, {
					"email": email,
					"password": password,
					"returnSecureToken": true
				})
			.then(r => r.data)
			.then(r => {
				console.log("loginapi:", r);
				return r;
			})
			.catch(err => {
				console.warn("server hiba:", err);
				//A promisz láncolat végi catch(...) kapja meg
				//az ide rekott paramétert
				return Promise.reject(err.response.data.error.message);
			})
	},

	GetPosts() {
		return Axios
			.get(`${FIREBASE_URL}/blogposts.json`)
			.then((result) => {
				return result.data;
			});
	},
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