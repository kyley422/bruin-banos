import React, { Component } from 'react'
import { useParams } from 'react-router-dom';

function BathroomPage() {
    const params = useParams()
    const bathroomId = params.bathroomId
  return (
    <div>
      <div>Bathroom{bathroomId}</div>
      <div>Bathroom{bathroomId}</div>
      <div>Bathroom{bathroomId}</div>
      <div>Bathroom{bathroomId}</div>
      <div>Bathroom {bathroomId}</div>
    </div>

  );

  // Have React display some information using Bathroom ID
  // Have React show invalid error if cant find Bathroom ID
}

export default BathroomPage