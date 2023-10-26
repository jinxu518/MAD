export default function Student({student}){
  return(
    <div>
      <p>{student.name} - {student.ID} - {student.email}</p>
    </div>
  )
}