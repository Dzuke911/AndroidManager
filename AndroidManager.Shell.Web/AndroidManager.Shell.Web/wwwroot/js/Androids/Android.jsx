﻿class Android extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.android };
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.android != nextProps.android) {

            this.setState({ data: nextProps.android });
        }
    }

    onDelete(e) {
        this.props.onDeleteAndroid(this.state.data);
    }

    onEdit(e) {
        this.props.setEditableData(this.state.data);
        this.props.hideForms("Update");
    }

    //getTooltip() {

    //    let dropdownList = [];
    //    let androids = this.state.data.Androids;
    //    if (androids.length == 0) {
    //        dropdownList.push(<span key={0} className="dropdown-item">No androids assigned</span>);
    //        return dropdownList;
    //    }
    //    for (let i = 0; i < androids.length; i++) {
    //        dropdownList.push(<span key={i} className="dropdown-item">{androids[i].Name}</span>);
    //    }

    //    return dropdownList;
    //}

    render() {

        //let dropdownList = this.getTooltip();

        let frameClass = "job-frame";
        let reliability = this.state.data.Reliability;

        if (reliability <= 0) {
            reliability = "Should be reclaimed";
        }

        return <div className={frameClass} data-toggle="tooltip" title={this.state.data.Description}>
            <label>{this.state.data.Name}</label>            
            <button className="btn btn-danger job-btn-delete" onClick={this.onDelete} data-toggle="tooltip" title="Delete android"><span className="glyphicon glyphicon-remove"></span></button>
            <br />
            <div><b>Reliability: </b>{reliability}</div>
            <button className="btn btn-primary job-btn-edit" onClick={this.onEdit} data-toggle="tooltip" title="Edit android"><span className="glyphicon glyphicon-edit"></span></button>
            <div className="dropdown job-dropdown">
                <button type="button" className="btn btn-primary dropdown-toggle job-dropdown-button" data-toggle="dropdown">Androids assigned</button>
                <div className="dropdown-menu">
                </div>
            </div>
        </div>;
    }
}