import React from 'react';
import Directory from './Directory';
import File from './File';
import $ from 'jquery';

export default class DirectoryTree extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            tree: {}
        };
    }

    componentDidMount() {
        $.get(this.props.url, (result) => {
            this.setState({
                loading: false,
                tree: result
            });
        });
    }

    render() {
        if (this.state.loading) return <span />;

        return (
            <div className="directory-tree-component">
                <div className="directory-tree-content">
                    {this.state.tree.map((object) => {
                        return this.renderFileOrDirectory(object);
                    })}
                </div>
            </div>
        );
    }

    renderFileOrDirectory(object) {
        let {type} = object;

        if (type === 'file') {
            return <File name={object.name} comment={object.comment} fileType={object.fileType} />;
        }

        if (type === 'directory') {
            return <Directory name={object.name} comment={object.comment} files={object.files} />;
        }
    }
}
