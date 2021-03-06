﻿class Job extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.job };
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.job != nextProps.job) {

            this.setState({ data: nextProps.job });
        }
    }

    onDelete(e) {
        this.props.onDeleteJob(this.state.data);
    }

    onEdit(e) {
        this.props.setEditableData(this.state.data);
        this.props.hideForms("Update");
    }

    getTooltip() {

        let dropdownList = [];
        let androids = this.state.data.Androids;

        if (androids.length == 0) {
            dropdownList.push(<span key={0} className="dropdown-item">No androids assigned</span>);
            return dropdownList;
        }
        for (let i = 0; i < androids.length; i++) {
            dropdownList.push(<div key={i} className="dropdown-item">{androids[i]}</div>);
        }

        return dropdownList;
    }

    render() {

        let dropdownList = this.getTooltip();

        let deleteClass = "btn btn-danger job-btn-delete";
        let isDisabled = false;
        let deleteTooltip = "Delete job";

        if (this.state.data.Androids.length > 0) {
            deleteClass = "btn btn-diabled job-btn-delete";
            isDisabled = true;
            deleteTooltip = "Can`t delete job with androids assigned";
        }

        return <div className="job-frame" data-toggle="tooltip" title={this.state.data.Description}>
            <label>{this.state.data.Name}</label>
            <button className={deleteClass} onClick={this.onDelete} data-toggle="tooltip" title={deleteTooltip} disabled={isDisabled}>
                <span className="glyphicon glyphicon-remove"></span>
            </button>
            <br />
            <div className="dropdown job-dropdown">
                <button type="button" className="btn btn-primary dropdown-toggle job-dropdown-button" data-toggle="dropdown">Androids assigned:</button>
                <div className="dropdown-menu">
                    {dropdownList}
                </div>
            </div>
            <button className="btn btn-primary job-btn-edit" onClick={this.onEdit} data-toggle="tooltip" title="Edit job"><span className="glyphicon glyphicon-edit"></span></button>
        </div>;
    }
}