document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.delete').forEach(button => button.addEventListener('click', function (event) {
    confirm('Are you sure you would like to delete this Review?')
  }))
})

validateForm= ()=>{
  if(document.getElementById('exampleTextarea').value== ' '){
        alert('Please provide a Review.')
        return false
      }
      else return true
  }
