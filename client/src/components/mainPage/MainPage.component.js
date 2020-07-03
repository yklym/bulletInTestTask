import React from "react";
import "./MainPage.scss";

class MainPageComponent extends React.Component {
    render() {
        return (
            <main className="main-page-main">
                <article>
                    <div className="text-wrapper">
                        <h3>"Hello!"</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                    <div className="img-wrapper">
                        <img src={"https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg"} alt={"pict"}/>
                    </div>
                </article>

                <article className="reverse-flex">
                    <div className="text-wrapper">
                        <h3>"Hello again!"</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                    <div className="img-wrapper">
                        <img src={"https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg"} alt={"pict"}/>
                    </div>
                </article>

                <section className="double-section">

                    <div className="text-wrapper">
                        <h5>"Hello again!"</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. .</p>
                    </div>

                    <div className="map-wrapper">
                        <iframe title={"map"}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325518.68780316407!2d30.252511957059642!3d50.4016990487754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2z0JrQuNGX0LIsIDAyMDAw!5e0!3m2!1suk!2sua!4v1593784732637!5m2!1suk!2sua"
                            frameBorder="0" allowFullScreen=""
                            // style={{margin : "auto 0"}}
                            aria-hidden="false" tabIndex="0">map
                        </iframe>
                    </div>
                </section>
            </main>
        );
    }
}

export default MainPageComponent;