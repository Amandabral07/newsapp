import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
static defaultProps={
  country : "in",
  pageSize : 8,
  category : 'general'
}
static propTypes={
  country : propTypes.string,
  pageSize : propTypes.number,
  category : propTypes.string
}

  constructor(){
    super();
    this.state = {
      articles : [],
      page:1,
      loading : true,
      totalResults : 0
    }}

    async updateNews(){
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9336da21ab5f438b9ab8c317709b7896&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true})
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        articles : parsedData.articles,
        totalResults : parsedData.totalResults,
        loading : false
      })
      this.props.setProgress(100);

    }

    async componentDidMount(){
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9336da21ab5f438b9ab8c317709b7896&page=1&pageSize=${this.props.pageSize}`
      // this.setState({loading : true})
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // this.setState({articles : parsedData.articles , totalResults : parsedData.totalResults ,loading : false })
      this.updateNews();
    }

    handlePreviousClick=async()=>{
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9336da21ab5f438b9ab8c317709b7896&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      // this.setState({loading : true})
      // let data = await fetch(url);
      // let parsedData = await data.json()
 
      // this.setState({
      //   page :1,
      //   articles : parsedData.articles,
      //   loading : false
      // })
      this.setState({page : this.state.page-1});
      this.updateNews();
    }

    handleNextClick=async()=>{
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9336da21ab5f438b9ab8c317709b7896&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      // this.setState({loading : true})
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // this.setState({
      //   page : this.state.page+1,
      //   articles : parsedData.articles,
      //   loading : false
      // })
      this.setState({page : this.state.page+1});
      this.updateNews();
    }

    fetchMoreData = async() => {
      this.setState({page : this.state.page+1})
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9336da21ab5f438b9ab8c317709b7896&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        articles : this.state.articles.concat(parsedData.articles),
        totalResults : parsedData.totalResults,
        loading : false,
    })
  };

  render() {
    return (
      <div className="container my-3">
       <center><h2 style={{margin : '35px'}}>NewsBaNk - Top {this.props.category} Headlines</h2></center> 

       {/* this says that if this.state.loading is true then show the spinner */}
       {this.state.loading && <Spinner/>}

       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

        <div className="row">
        {this.state.articles.map((element)=>{
          return  <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={ element.author ? element.author : 'Unknown'} date={element.publishedAt} source={element.source.name}/>
          </div>
        })}
    </div>
    </InfiniteScroll>

     </div>
    )
  }
}

export default News

