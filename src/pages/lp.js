import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import { Container, Row, Col } from 'react-emotion-grid';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';

const theme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: 0
        }
      }
    }
  }
});

export const HeaderContainer = ({ className, text, children }) => (
  <div className={className}>
    {children}
  </div>
);

const HeaderContainerStyled = styled(HeaderContainer)`
display: flex;
justify-content: center;
background-color: lightgray;
min-height: 30vh;
`;

export const HeaderContent = ({ className, text }) => (
  <div className={className}>
    {text}
  </div>
);

const HeaderContentStyled = styled(HeaderContent)`
background-color: lightblue;
width: 900px;
`;

export const MainContainer = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);

const MainContainerStyled = styled(MainContainer)`
display: flex;
justify-content: center;
background-color: lightgreen;
min-height: 70vh;
`;

export const MainContent = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);

const MainContentStyled = styled(MainContent)`
background-color: lightcyan;
width: 900px;
`;

const SimpleCard = props => {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        className={classes.media}
        height="140"
        image="https://via.placeholder.com/150x150"
        title="Contemplative Reptile"
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          {props.fullName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.positionJP}{bull}{props.positionEN}
        </Typography>
      </CardContent>
    </Card>
  );
};

const styles = {
  card: {
    // display: 'flex',
    // flexDirection: 'row'
    // flexDirection: 'row'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 12,
    marginBottom: 12,
  },
  content: {
    // paddingBottom: '0px',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    objectFit: 'cover',
    marginBottom: 0
  },
};

const SimpleCardStyled = withStyles(styles)(SimpleCard);

export const Section = ({ className, sectionName }) => (
  <div className={className}>
    <div css={css`
display: flex;
justify-content: center;
`}>
      <p>{sectionName}</p>
    </div>
    <Container>
      <Row>
        <Col><SimpleCardStyled fullName={'Ryo Murakami'} positionJP={'代表取締役'}
          positionEN={'CEO'}/></Col>
        <Col><SimpleCardStyled fullName={'Yohei Hasegawa'} positionJP={'取締役'}
          positionEN={'CTO'}/></Col>
      </Row>
    </Container>

  </div>
);

export default () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <HeaderContainerStyled>
          <HeaderContentStyled text={'header text'}/>
        </HeaderContainerStyled>
        <MainContainerStyled>
          <MainContentStyled>
            <Section sectionName={'Speciality'}/>
            <Section sectionName={'Team'}/>
            <Section sectionName={'Contact'}/>
          </MainContentStyled>
        </MainContainerStyled>
      </div>
    </MuiThemeProvider>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
