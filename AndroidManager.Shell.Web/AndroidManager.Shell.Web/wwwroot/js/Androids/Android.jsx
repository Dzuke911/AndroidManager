class Android extends React.Component {

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

    getTooltip() {

        let dropdownList = [];
        let skills = this.state.data.Skills;

        if (skills.length == 0) {
            dropdownList.push(<span key={0} className="dropdown-item">No skills</span>);
            return dropdownList;
        }
        for (let i = 0; i < skills.length; i++) {
            dropdownList.push(<div key={i} className="dropdown-item">{skills[i].Name}</div>);
        }

        return dropdownList;
    }

    render() {

        let dropdownList = this.getTooltip();

        let frameClass = "android-frame";
        let reliability = this.state.data.Reliability;

        if (reliability <= 0) {
            reliability = "Should be reclaimed";
            frameClass += " should-reclaimed";
        }

        return <div className={frameClass} data-toggle="tooltip" title={this.state.data.Description}>
            <label>{this.state.data.Name}</label>            
            <button className="btn btn-danger job-btn-delete" onClick={this.onDelete} data-toggle="tooltip" title="Delete android"><span className="glyphicon glyphicon-remove"></span></button>
            <br />
            <div><b>Job: </b>{this.state.data.Job.Name}</div>
            <div><b>Reliability: </b>{reliability}</div>
            <button className="btn btn-primary job-btn-edit" onClick={this.onEdit} data-toggle="tooltip" title="Edit android"><span className="glyphicon glyphicon-edit"></span></button>
            <div className="dropdown job-dropdown">
                <button type="button" className="btn btn-primary dropdown-toggle job-dropdown-button" data-toggle="dropdown">Skills</button>
                <div className="dropdown-menu">
                    {dropdownList}
                </div>
            </div>
        </div>;
    }
}