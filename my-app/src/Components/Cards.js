import React from 'react';
import '../index.css'

export default function Card({posts,loading}){
    // destructive props
   
    if(loading){
        // if loading is true returing below html
       return <h1 className='loading'>Loading...</h1>
    }

    const github_data = posts.map(({login,avatar_url,html_url})=>{
        return (
            <div className="card--body">
            <div className="img--card">
                <img src={avatar_url} alt="" />
            </div>
            <div className="lower--body">
                <h4 className="name">{login}</h4>
                <a  target="_blank"  href={html_url}>view profile</a>
            </div>
        </div>
        )
    })


    return(
        <div className='whole-cards'>
          {github_data}
        </div>
        
    )
}