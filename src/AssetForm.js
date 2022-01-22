const AssetForm = ({onSubmit, inputs, handleChange}) => {

    const {nmcAsset, registration} = inputs

    return (
    <form onSubmit={onSubmit}>
       <label>
          nmcAsset:
          <input type="text" name="nmcAsset" value={nmcAsset} onChange={e => handleChange(e)} />
        </label>

        <label>
          Registered on:
          <input type="text" name="registration" value={registration} onChange={e => handleChange(e)} />
        </label>
        <input type="submit" value="Submit" />
     </form>)
}

export default AssetForm;