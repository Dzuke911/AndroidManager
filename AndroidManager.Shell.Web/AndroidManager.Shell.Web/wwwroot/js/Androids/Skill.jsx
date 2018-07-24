class Android extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.skill };
        this.onDelete = this.onDelete.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.skill != nextProps.skill) {

            this.setState({ data: nextProps.skill });
        }
    }

    onDelete(e) {
        this.props.onDeleteSkill(this.state.data);
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

        return <div className="skill-frame">
            <label>{this.state.data.Name}</label>
            <button className="btn btn-danger job-btn-delete" onClick={this.onDelete} data-toggle="tooltip" title="Delete skill"><span className="glyphicon glyphicon-remove"></span></button>
        </div>;
    }
}