macro $time {
    case {_ + $x:lit h $rest ... } => {
        return #{
            .map(
                function(x) {
                    return x + ($x * 1000 * 60 * 60)
                }
            )
            $time $rest ...
        }
    }
   case {_ + $x:lit m $rest ... } => {
        return #{ 
            .map(
                function(x) {
                    return x + ($x * 1000 * 60)
                }
            )
            $time $rest ...
        }
    }
    case {_ + $x:lit s $rest ... } => {
        return #{ 
            .map(
                function(x) {
                    return x + ($x * 1000)
                }
            ) 
            $time $rest ...
        }
    }
    case {_ + $x:lit ms $rest ... } => {
        return #{ 
            .map(
                function(x) {
                    return x + $x
                }
            ) 
            $time $rest ...  
        }
    }
    case {_ $x:lit h $rest ... } => {
        return #{ _.Hours($x) $time $rest ... }
    }
    case {_ $x:lit m $rest ... } => {
        return #{ _.Minutes($x) $time $rest ... }
    }
    case {_ $x:lit s $rest ... } => {
        return #{ _.Seconds($x) $time $rest ... }
    }
    case {_ $x:lit ms $rest ... } => {
        return #{ _.Milliseconds($x) $time $rest ... }
    }
    case {_ } => {
        return #{}
    }
}