module tb;

reg A,B;
wire Y;

and_gate uut(.A(A), .B(B), .Y(Y));

initial begin
$dumpfile("dump.vcd");
$dumpvars(0, tb);

$display("A B | Y");

A=0; B=0; #10;
$display("%b %b | %b",A,B,Y);

A=0; B=1; #10;
$display("%b %b | %b",A,B,Y);

A=1; B=0; #10;
$display("%b %b | %b",A,B,Y);

A=1; B=1; #10;
$display("%b %b | %b",A,B,Y);

#10 $finish;

end

endmodule