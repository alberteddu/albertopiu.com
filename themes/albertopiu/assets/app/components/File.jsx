import React from 'react';

export default class File extends React.Component {
    render() {
        return (
            <div className="directory-tree-file">
                <div className="node-line">
                    <span className="node-name">
                        <i className={`icon-${this.props.fileType}`}/>
                        {this.props.name}
                    </span>
                    <span className="node-comment">{this.props.comment}</span>
                </div>
            </div>
        );
    }
}
