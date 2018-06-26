import React from 'react';

function Flag({ language }) {
    let icon = "";

    switch(language) {
        case "de":
            icon = "🇩🇪";
            break;
        case "en":
            icon = "🇬🇧";
            break;
        case "bg":
        default:
            icon = "🇧🇬";    
    }

    return <span>{icon}</span>
}

function Article(props) {
    const { title, children, language } = props;
    return (
        <article>
            <h1>{title}</h1>
            <section>
                {children}
            </section>
            <Flag language={language} />
        </article>
    );
}

export default Article;