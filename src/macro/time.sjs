macro $time {
    case {_ + $x h $rest ... } => {
        return #{
            .map(
                function(x) {
                    return x + ($x * 1000 * 60 * 60)
                }
            )
            $time $rest ...
        }
    }
   case {_ + $x m $rest ... } => {
        return #{ 
            .map(
                function(x) {
                    return x + ($x * 1000 * 60)
                }
            )
            $time $rest ...
        }
    }
    case {_ + $x s $rest ... } => {
        return #{ 
            .map(
                function(x) {
                    return x + ($x * 1000)
                }
            ) 
            $time $rest ...
        }
    }
    case {_ + $x ms $rest ... } => {
        return #{ 
            .map(
                function(x) {
                    return x + $x
                }
            ) 
            $time $rest ...  
        }
    }
    case {_ $x h $rest ... } => {
        return #{ _.Hours($x) $time $rest ... }
    }
    case {_ $x m $rest ... } => {
        return #{ _.Minutes($x) $time $rest ... }
    }
    case {_ $x s $rest ... } => {
        return #{ _.Seconds($x) $time $rest ... }
    }
    case {_ $x ms $rest ... } => {
        return #{ _.Milliseconds($x) $time $rest ... }
    }
    case {_ } => {
        return #{}
    }
}