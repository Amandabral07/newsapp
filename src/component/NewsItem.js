import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let{title , description , imageUrl , newsUrl ,author , date , source} = this.props;
        return (
            <div className='my-3'>
                <span class="badge rounded-pill text-bg-danger">{source}</span>
                <div className="card">
                    <img src={imageUrl ? imageUrl : "https://cdn.ndtv.com/common/images/ogndtv.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text text-secondaryy"><small>By {author} on {new Date(date).toGMTString()}</small></p>
                        {/* using target="_blank" the article opens in new tab */}
                        <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>  
                    </div> 
                </div>

            </div>
        )
    } 
}

export default NewsItem
