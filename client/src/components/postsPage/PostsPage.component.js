import React from "react";
import "./PostsPage.scss";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import PaginationComponent from "./pagination/Pagination.component";

import PostsService from "../../sevices/Post.service";
import UserService from "../../sevices/User.service";
import {pageSize} from "../../config";

class PostsPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1,
            postsPage: null,
        }
    }

    componentDidMount() {
        PostsService.loadAll().then(res => {
            this.renderPage();
        })
    }

    renderPage = (pageNumber = 1) => {

        this.setState({
            postsPage: PostsService.getPage(pageNumber, pageSize),
            currPage: pageNumber,
        });

        window.scrollTo(0, 0);
    };

    renderPostsCards = posts => {
        return posts.map(post => {
            return (<Card key={post._id}
                          className={UserService.user && post.user &&UserService.user._id === post.user._id ? "border-danger" : "border-secondary"}>
                <div className={"img-wrapper"}>
                    <Card.Img variant="top"
                              src="https://cdn.royalcanin-weshare-online.io/aGkhPmYBG95Xk-RBGt0V/v1/ec12h-5-key-milestones-in-your-kittens-growth-hero-cat"/>
                </div>

                <Card.Body>
                    <Card.Title>{post.name}</Card.Title>
                    <Card.Text>
                        {post.description}
                    </Card.Text>
                    <Card.Footer className={"post-card-footer"}>
                        <p><strong>Author:</strong> {post.user ? `${post.user.firstName} ${post.user.lastName}` : "User deleted"}</p>
                        <p><strong>Created at:</strong> {new Date(post.addedAt).toDateString()} </p>
                    </Card.Footer>

                    <Button variant="primary">Continue reading</Button>
                </Card.Body>
            </Card>);
        })
    }

    noResultMessage = () => {
        return (
            <div className="posts-page-nores-message">
                <h3>No posts have been found!</h3>
                <p>Try later or change filters</p>
            </div>
        );
    }

    render() {
        const postsList = this.state.postsPage;

        if (!postsList) {
            return (
                <main className="posts-page-main">
                    <Spinner animation="border" role="status" className="post-page-loader">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </main>
            )
        }
        return (
            <main className="posts-page-main">
                {postsList.length ? this.renderPostsCards(postsList) : this.noResultMessage()}

                {/*TODO Add filters block*/}

                <PaginationComponent maxPage={PostsService.getPagesCount(pageSize)} currPage={this.state.currPage}
                                     renderPage={this.renderPage}/>
            </main>
        );
    }
}

export default PostsPageComponent;
