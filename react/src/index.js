import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: 'reactjs',
      vedios: [],
      loadingTime: null ,
      runningVideoUrl: '',
      comment: '',
      listOfcomments: [],
      likeCondition: 'Like',
      isErrorInLoading: false
    };
  }
setSearchValue = (event) => {

this.setState({
  searchKeyword: event.target.value
})
console.log(this.state.searchKeyword)
}
searchVideo = async () => {
    this.setState({
    loadingTime: "LOADING",
    isErrorInLoading: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchKeyword}&type=video&videoDefinition=high&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    isErrorInLoading: true
  })
}
this.setState({
  vedios: myJson.items
})
console.log(this.state.vedios)
  this.setState({
    loadingTime: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadingTime: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyAIPAlsSwZchsAbGSOqKycYAYOGJW4c-bg`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  vedios: myJson.items,
  loadingTime: "LOADED"
})
console.log(this.state.vedios)
this.setState({
  runningVideoUrl: this.state.vedios[0].id.videoId
})
console.log("runningVideoUrl" , this.state.runningVideoUrl)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("vedios" , this.state.vedios)
}
setCurrentUrl = (id) => {

  this.setState({
    runningVideoUrl: id
  })
}
setcomment = (event) => {
  this.setState({
    comment: event.target.value
  })
}
setname = (event) => {
  this.setState({
    name: event.target.value
  })
}
addcomment = () => {
  this.setState({
    listOfcomments: [...this.state.listOfcomments, this.state.comment],
    comment: ''
  })
}
likeButton = () => {
  if(this.state.likeCondition == "Like"){
  this.setState({
    likeCondition: 'Liked'
  })
  } else {
      this.setState({
    likeCondition: 'Like'
  })
  }

}
  render() {
    let videos = this.state.vedios.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '300px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"400px",width:"450px",padding:"5px"}} placeholder="Search here..." onChange={this.setSearchValue} />
        <button style={{padding:"5px"}} onClick={this.searchVideo}>Search</button>
        <br/>      
      <div>
      <hr/>
      <br/>
      
{this.state.isErrorInLoading ? (<h1>No search found</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.runningVideoUrl}`} style={{height: '500px', width: '840px', float : 'left'}}/>
)}
      </div>
        <div style={{ width: '455px', float : 'right'}}>
        <h1 > Up Next</h1>
        {this.state.loadingTime == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        <br/>
        </div>
         <div style={{display: 'block', float: 'left'}}>
         <br/>
    <button  style={ {
  marginLeft: "1px",width:'60px',padding:'12px'}}onClick={this.likeButton}>{this.state.likeCondition}</button>
{this.state.listOfcomments.map(eachcomment => (
  <li>{eachcomment}</li>
))}
         <h3> Comments</h3>
    <input style ={{outline: 0 ,border: '0',borderBottom: '2px solid #484a56',width:'300px'}} onChange={this.setname} placeholder= "Your name" value={this.state.name}/>
    <textarea  style ={{outline: 0,border: '0', borderBottom: '2px solid #484a56', marginLeft:"45px", width:'300px',height:'19px'}}onChange={this.setcomment} placeholder="Your comment" value={this.state.comment}/> 
    <br/>
    <br/>
    <button  style={{marginLeft:'580px', width:'120px'}} onClick={this.addcomment}> Comment</button>
    <button onClick={this.addcomment} style={{marginLeft:"20px" ,width:'120px'}}> Cancel</button>
    </div>
    </div>
    );
  }
}

render(<App />, document.getElementById('root'));