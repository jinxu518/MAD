const baseUrl = 'http://localhost:3000/departments';
const departmentCode = "6531fcb2eed4d6c3f52c14c5";

export async function addDepartment(department) {
    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(department),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('POST request error:', error);
        throw error;
    }
}

export async function getCourses() {
    try {
        const response = await fetch(`${baseUrl}/${departmentCode}/courses`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('GET request error:', error);
        throw error;
    }
}

export async function addCourse(newCourse) {
    try {
        const response = await fetch(`${baseUrl}/${departmentCode}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCourse),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('POST request error:', error);
        throw error;
    }
}

export async function updateCourse(courseCode, course) {
    try {
        const response = await fetch(`${baseUrl}/${departmentCode}/courses/${courseCode}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('PATCH request error:', error);
        throw error;
    }
}

export async function deleteCourse(courseCode) {
    try {
        console.log(courseCode);
        const response = await fetch(`${baseUrl}/${departmentCode}/courses/${courseCode}`, {
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        console.error('DELETE request error:', error);
        throw error;
    }
}


export async function addReview(courseCode, review) {
    try {
      const response = await fetch(`${baseUrl}/${departmentCode}/courses/${courseCode}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
  
      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('POST request error:', error);
      return false;
    }
  }
  