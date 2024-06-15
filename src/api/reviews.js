// User endpoints:
export async function login(username, password){
  try{
    const response = await fetch('http://localhost:4001/login', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
    return {user: response};
  } catch(err){
    return {err: true, message: err.message};
  };
};


export async function logout(){
  try {
    const response = await fetch(`http://localhost:4001/logout`, {
      credentials: 'include',
    });
   return {err: false, res: response};
  } catch(err) {
    return {err: true, msg: "An error occured. Please try again."}
  }
};


export async function registerUser({username, password, email}){
  try{
    const response = await fetch('http://localhost:4001/register', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        username, password, email,
      }),
      headers: {
        "Content-Type": "application/json",
    },
    });
    const json = await response.json();
    return json;
  } catch(err) {
    return "An error occured. Please try again.";
  }
};


export async function getUser() {
  try {
    const response = await fetch('http://localhost:4001', {
      credentials: 'include',
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};


export async function getUserHistory(){
  try{
    const response = await fetch(`http://localhost:4001/user/history`, {
      credentials: 'include',
    });
   return {err: false, res: response};
  } catch(err) {
    return {err: true, msg: "An error occured. Please try again."}
  }
};


export async function editUserHistory(reviews,likes,liked){
  try{
    console.log(reviews,liked,likes);
    const response = await fetch('http://localhost:4001/user/history',{
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({
        reviews, likes, liked, a:"Hello"
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return {err: false, res: response};
  } catch(err){
    return {err: true, msg: "An error occured. Please try again."};
  }
}


// Reviews endpoints:
export async function getReviewsByUserId(){
  try{
    const response = await fetch(`http://localhost:4001/reviews`, {
      credentials: 'include',
    });
    console.log(response);
   return response;
  } catch(err) {
    return {err: true, msg: "An error occured. Please try again."}
  }
}



export async function createPost(title, author, date, time, img, rating, content, subject){
    try{
      const response = await fetch("http://localhost:4001/reviews", {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify({
              title, author, date, time, img, rating, content, subject
          }),
          headers: {
              "Content-Type": "application/json",
          },
      });
      return response;
    } catch(err) {
      return err.message;
    };
};



export async function getPostById(id){
    fetch(`https://localhost:4001`)
    .then(d => d.json())
    .then(d => d);
};



export async function getReviewsBySubject(subject){
  try {
    const response = await fetch(`http://localhost:4001/all/reviews/subject/${subject}`, {
      credentials: 'include',
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch(err) {
    return err.message;
  }
};


export async function getReviewByTitle(title){
  try{
    const response = await fetch(`http://localhost:4001/all/reviews/title/${title}`, {
      credentials: 'include',
    });
    const json = response.json();
    return json;
  } catch(err) {
    return {err: true, msg: err.message};
  };
};


export async function deleteReview(id){
  const res = await fetch(`http://localhost:4001/reviews/${id}`, {
    credentials: 'include',
    method: 'DELETE'
  });
  const j = await res.json();
  return j;
};
