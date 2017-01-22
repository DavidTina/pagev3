/**
 * Created by huangling on 19/01/2017.
 */
import React, {Component} from 'react';
import Text from '../components/singleItem/Text';
import Image from '../components/singleItem/Image';
import BoardSquare from '../components/BoardSquare';
import {Button, Modal} from 'antd';
import * as ReactDOM from 'react-dom';
import SettingDialog from '../components/SettingDialog';

const Widgets = {
  Image,
  Text
};

let previewHtml = '';

export default class Page extends Component {
  componentWillMount() {
    this.state = {
      boxes: [{top: 20, left: 80, title: 'Drag me around'},
        {top: 180, left: 20, title: 'Drag me too'}
      ],
      newBox: null
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onPreview = this.onPreview.bind(this);
  }

  onAddItem(type) {
    const Comp = Widgets[type];
    this.setState({
      newBox: {
        top: 20,
        left: 80,
        title: <Comp />,
        onClick: () => {
          this.setState({showSetting: true});
        }
      }
    });
  }

  onSave() {
    const board = ReactDOM.findDOMNode(this.board);
    previewHtml = board.innerHTML;
  }

  onPreview() {
    if (!previewHtml) {
      this.onSave();
    }

    this.setState({preview: true});
  }

  updateStyle(style) {
    this.state.boxes[0].style = style;
    this.setState({boxes: this.state.boxes});
  }
  renderPreview() {
    return (
      <div className="layer">
        <Modal
          visible
          title="Preview"
          onOk={() => this.setState({preview: false})}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={() => this.setState({preview: false})}>Return</Button>
          ]}>
          <div dangerouslySetInnerHTML={{__html: previewHtml}}/>
        </Modal>
      </div>
    );
  }

  render() {
    const headerItem = [
      {title: 'Text'}, {title: 'Image'}
    ];

    const {preview, showSetting} = this.state;

    return (
      <div>
        <div>
          <header className="header">
            {
              headerItem.map((item, index) => (
                <Button className="item"
                        onClick={() => this.onAddItem(item.title)}>
                  {item.title}
                </Button>)
              )
            }
          </header>
          <div className="main-container">
            <section className="content">
              <BoardSquare ref={node => this.board = node} boxes={this.state.boxes} newBox={this.state.newBox}/>
            </section>
            <aside className="sidebar-right">
              <Button onClick={() => this.onSave()}>Save</Button>
              <Button onClick={() => this.onPreview()}>Preview</Button>
              <SettingDialog toggleShow={(show) => this.setState({showSetting: show})}
                             updateStyle={this.updateStyle.bind(this)}
                             show={showSetting}
              />
            </aside>
          </div>
        </div>
        <div >
          {preview && this.renderPreview()}
        </div>
      </div>
    );
  }
}



