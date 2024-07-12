// pages/payments.tsx


"use client"
import { Payment } from "@/datas/types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get<any, AxiosResponse<any>>('http://localhost:4000/payments');
        setPayments(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Erreur lors de la récupération des paiements :', error);
      }
    };

    fetchPayments();
  }, [payments]);
  
  return (
    <div>
      <h1>Paiements</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Montant</th>
            <th>Date</th>
            <th>auteur</th>
            <th>offer</th>
            <th>N carte</th>
            <th>validite</th>
          </tr>
        </thead>
        <tbody>
          {
         payments.map((payment, index) => (
          <tr key={index}>
             <td>{payment.id}</td>
              <td>{payment.author}</td>
              <td>{payment.cardNumber}</td>
              <td>{payment.offer}</td>
              <td>{payment.amount}</td>
              <td>{payment.date}</td>
              <td>{payment.validity}</td>
            </tr>
          ))
          
          }
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsPage;
