import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    // <ul className='list-group mb-4'>
    //   {posts.map(post => (
    //     <li key={post.id} className='list-group-item'>
    //       {post.id} - {post.title}
    //     </li>
    //   ))}
    // </ul>
    <table className="table table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
        </tr>
        </thead>

        
        <tbody>
           {posts.map(post => (
               <tr>  
                <td  scope="row" key={post.id} >{post.id} </td>
                <td  scope="row" > {post.title}</td>
                </tr>
      ))}
      </tbody>
        
    
    </table>
  );
};

export default Posts;