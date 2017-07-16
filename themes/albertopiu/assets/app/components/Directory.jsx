import React from 'react';
import File from './File';

export default class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            open: true
        };
    }

    render() {
        return (
            <div className="directory-tree-directory">
                <div className="node-line" onClick={() => this.setState({
                    open: !this.state.open
                })}>
                    <span className="node-name">
                        <i className={`icon-folder${this.state.open ? '-open' : ''}`}/>
                        {this.props.name}
                        <span className="slash">/</span>
                    </span>
                    <span className="node-comment">{this.props.comment}</span>
                </div>
                {this.state.open ? <div className="node-files">
                    {this.props.files.map((object) => {
                        if (object.type === 'file') {
                            return <File name={object.name} comment={object.comment} fileType={object.fileType}/>;
                        }

                        if (object.type === 'directory') {
                            return <Directory name={object.name} comment={object.comment} files={object.files} />;
                        }
                    })}
                </div> : null}
            </div>
        );
    }
}
