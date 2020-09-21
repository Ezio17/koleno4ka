import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { IoMdClose } from "react-icons/io";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: '30px',
    position: 'relative'
  },
  gridList: {
    width: "100%",
    height: '80vh',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  empty: {
    fontSize: '40px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto!important',
    height: 'auto!important',
    color: '#f5480f',
    paddingBottom: '80px!important',
    textAlign: 'center'
  }
};

class ImageLightBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };

    this.handleOnOpenImage = this.handleOnOpenImage.bind(this);
  }

  getGridListCols = () => {
    if (isWidthUp('xl', this.props.width)) {
      return 5;
    }

    if (isWidthUp('lg', this.props.width)) {
      return 4;
    }

    if (isWidthUp('md', this.props.width)) {
      return 3;
    }

    if (isWidthUp('sm', this.props.width)) {
      return 2;
    }

    return 1;
  }

  handleOnOpenImage(index) {
    this.setState(
      {
        isOpen: true,
        photoIndex: index
      })
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    const { photo, deletePhoto, classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <GridList cellHeight={300} className={classes.gridList} cols={this.getGridListCols()} spacing={6}>
            {photo.length > 0 ? (
              photo.map((img, index) => (
                <GridListTile style={{ cursor: 'pointer' }} key={img._id}>
                  <img
                    src={`https://koleno4ka.herokuapp.com/${img.img}`}
                    alt={img.category}
                    onClick={() => this.handleOnOpenImage(index)}
                    className={classes.img}
                  />
                  <GridListTileBar
                    title={img.category}
                    titlePosition="top"
                    className={classes.titleBar}
                    actionIcon={
                      <Tooltip title="Удалить">
                        <IconButton onClick={() => deletePhoto(img._id)}>
                          <IoMdClose color='#f5480f' />
                        </IconButton>
                      </Tooltip>
                    }
                  />
                </GridListTile>
              ))
            ) : (
                <h3 className={classes.empty}>Нет фотографий.</h3>
              )}
          </GridList>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={`https://koleno4ka.herokuapp.com/${photo[photoIndex].img}`}
            nextSrc={`https://koleno4ka.herokuapp.com/${photo[(photoIndex + 1) % photo.length].img}`}
            prevSrc={photo[(photoIndex + photo.length - 1) % photo.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + photo.length - 1) % photo.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % photo.length,
              })
            }
          />
        )}
      </div>
    );
  }
};

const withWidthBox = withWidth()(ImageLightBox)

export default withStyles(styles)(withWidthBox);