import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

export const FicheConseilTemplate = ({
  helmet,
  title,
  themes,
  image,
  chapeau,
  sections,
}) => {
  console.log(
    'title, theme, featuredImage, chapeau, sections :',
    title,
    themes,
    image,
    chapeau,
    sections,
  );
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div>
              Themes:
              {themes.map(t => (
                <div key={t}>{t}</div>
              ))}
            </div>
            <img src={image} alt="test" />
            <p> {chapeau}</p>
            <p>sections : {sections}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

FicheConseilTemplate.propTypes = {
  helmet: PropTypes.object,
  title: PropTypes.string,
  themes: PropTypes.array,
  image: PropTypes.string,
  chapeau: PropTypes.string,
  sections: PropTypes.array,
};

const FicheConseil = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(
    'post.frontmatter.featuredimage :',
    post.frontmatter.featuredimage,
  );
  return (
    <Layout>
      <FicheConseilTemplate
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.chapeau}`} />
          </Helmet>
        }
        title={post.frontmatter.title}
        themes={post.frontmatter.theme}
        image={post.frontmatter.featuredimage.childImageSharp.fluid.src}
        chapeau={post.frontmatter.chapeau}
        sections={post.frontmatter.sections}
      />
    </Layout>
  );
};

FicheConseil.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default FicheConseil;

export const pageQuery = graphql`
  query FicheByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        theme
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        chapeau
      }
    }
  }
`;
