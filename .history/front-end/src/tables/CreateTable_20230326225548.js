import React, { useState } from 'react';

export default function CreateTable() {
  const [table, setTable] = useState({ table_name: '', capacity: '' });
  const [error, setError] = useState(null);
  return <div></div>;
}
