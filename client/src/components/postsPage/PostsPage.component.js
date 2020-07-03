import React from "react";
import "./PostsPage.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class PostsPageComponent extends React.Component {
    render() {
        return (
            <main className="posts-page-main">
                <Card>
                    <div className={"img-wrapper"}>
                        <Card.Img variant="top" src="https://cdn.royalcanin-weshare-online.io/aGkhPmYBG95Xk-RBGt0V/v1/ec12h-5-key-milestones-in-your-kittens-growth-hero-cat" />
                    </div>

                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </main>
        );
    }
}

export default PostsPageComponent;