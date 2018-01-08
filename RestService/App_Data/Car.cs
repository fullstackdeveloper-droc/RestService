using System;
using System.Runtime.Serialization;

[Serializable]
[DataContract]
public class Car
{
    [DataMember]
    public int ID { get; set; }
    [DataMember]
    public string Color { get; set; }
    [DataMember]
    public string Make { get; set; }
    [DataMember]
    public string Model { get; set; }
    [DataMember]
    public DateTime Year { get; set; }
}