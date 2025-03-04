
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SalaryComputation } from '@/types/employee';
import { motion } from 'framer-motion';

interface PayrollSummaryProps {
  salaryData: SalaryComputation;
}

const PayrollSummary = ({ salaryData }: PayrollSummaryProps) => {
  // Format number as currency (PHP)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border">
        <CardHeader className="bg-muted/50 pb-2 pt-4">
          <CardTitle className="text-lg">Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Hours Breakdown */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Hours Breakdown</h3>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <span>Regular Hours:</span>
                <span className="text-right font-medium">{salaryData.regularHours.toFixed(2)} hrs</span>
                <span>Overtime Hours:</span>
                <span className="text-right font-medium">{salaryData.overtimeHours.toFixed(2)} hrs</span>
              </div>
            </div>
            
            <Separator />
            
            {/* Earnings */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Earnings</h3>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <span>Regular Pay:</span>
                <span className="text-right font-medium">{formatCurrency(salaryData.regularPay)}</span>
                <span>Overtime Pay:</span>
                <span className="text-right font-medium">{formatCurrency(salaryData.overtimePay)}</span>
                <span className="font-semibold pt-1">Gross Pay:</span>
                <span className="text-right font-semibold pt-1">{formatCurrency(salaryData.grossPay)}</span>
              </div>
            </motion.div>
            
            <Separator />
            
            {/* Deductions */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Deductions</h3>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <span>SSS Contribution:</span>
                <span className="text-right text-red-600">{formatCurrency(salaryData.sssDeduction)}</span>
                <span>PhilHealth:</span>
                <span className="text-right text-red-600">{formatCurrency(salaryData.philhealthDeduction)}</span>
                <span>Pag-IBIG:</span>
                <span className="text-right text-red-600">{formatCurrency(salaryData.pagibigDeduction)}</span>
                <span>Withholding Tax:</span>
                <span className="text-right text-red-600">{formatCurrency(salaryData.taxDeduction)}</span>
                <span className="font-semibold pt-1">Total Deductions:</span>
                <span className="text-right font-semibold text-red-600 pt-1">{formatCurrency(salaryData.totalDeductions)}</span>
              </div>
            </motion.div>
            
            <Separator />
            
            {/* Net Pay */}
            <motion.div variants={itemVariants} className="bg-muted/50 p-3 rounded-md">
              <div className="grid grid-cols-2 gap-1">
                <span className="text-base font-bold">NET PAY:</span>
                <span className="text-right text-base font-bold text-primary">
                  {formatCurrency(salaryData.netPay)}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PayrollSummary;
