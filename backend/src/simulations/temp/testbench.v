module tb;
  reg        clk;
  reg        rst;
  wire [3:0] count;

  counter uut (
    .clk(clk),
    .rst(rst),
    .count(count)
  );

  // 10ns clock
  initial clk = 0;
  always #5 clk = ~clk;

  initial begin
    $dumpfile("dump.vcd");   // must match what the backend reads
    $dumpvars(0, tb);        // dump everything under tb

    rst = 1;
    #12 rst = 0;
    #100 $finish;
  end
endmodule