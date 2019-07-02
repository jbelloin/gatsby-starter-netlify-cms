import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content from '../components/Content';

export const FicheConseilTemplate = ({
  helmet,
  title,
  theme,
  featuredImage,
  chapeau,
  sections,
}) => {
  console.log(
    'title, theme, featuredImage, chapeau, sections :',
    title,
    theme,
    featuredImage,
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
            <p>theme : {theme}</p>
            <p>featuredImage : {featuredImage}</p>
            <p>chapeau : {chapeau}</p>
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
  theme: PropTypes.object,
  featuredImage: PropTypes.object,
  chapeau: PropTypes.string,
  sections: PropTypes.object,
};

const FicheConseil = ({ data }) => {
  const { markdownRemark: post } = data;

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
        theme={post.frontmatter.theme}
        featuredImage={post.frontmatter.featuredImage}
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
        featuredImage
        chapeau
        sections
      }
    }
  }
`;
