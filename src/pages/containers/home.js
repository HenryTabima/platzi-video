import React, {Component} from 'react'
import HomeLayout from '../components/home-layout'
import Categories from '../../categories/components/categories'
import Related from '../components/related'
import ModalContainer from '../../widgets/containers/modal'
import Modal from '../../widgets/components/modal'
import HandleError from '../../error/containers/handle-error'
import VideoPlayer from '../../player/containers/video-player'

class Home extends Component {
  state = { // eslint-disable-line no-undef
    modalVisible: false,
    media: null
  }
  handleOpenModal = (media) => { // eslint-disable-line no-undef
    this.setState({
      modalVisible: true,
      media
    })
  }
  handleCloseModal = (event) => { // eslint-disable-line no-undef
    this.setState({
      modalVisible: false
    })
  }
  render () {
    return (
      <HandleError>
        <HomeLayout>
          <Related />
          <Categories
            categories={this.props.data.categories}
            handleOpenModal={this.handleOpenModal}
          />
          {
            this.state.modalVisible &&
            <ModalContainer>
              <Modal
                handleClick={this.handleCloseModal}
              >
                <VideoPlayer
                  autoplay
                  src={this.state.media.src}
                  title={this.state.media.title}
                />
              </Modal>
            </ModalContainer>
          }
        </HomeLayout>
      </HandleError>
    )
  }
}

export default Home
